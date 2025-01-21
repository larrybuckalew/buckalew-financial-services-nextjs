import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const { documentId } = req.query;

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const bucketName = process.env.R2_BUCKET_NAME;
  if (!bucketName) {
    return res.status(500).json({ message: 'Storage not configured' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const document = await r2_get_object({
          bucket: bucketName,
          key: `${session.user.id}/${documentId}`
        });

        if (!document) {
          return res.status(404).json({ message: 'Document not found' });
        }

        return res.status(200).json(JSON.parse(document));
      } catch (error) {
        console.error('Error fetching document:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'PUT':
      try {
        const { content, contentType } = req.body;

        await r2_put_object({
          bucket: bucketName,
          key: `${session.user.id}/${documentId}`,
          content: JSON.stringify(content),
          contentType: contentType || 'application/json'
        });

        return res.status(200).json({ message: 'Document saved successfully' });
      } catch (error) {
        console.error('Error saving document:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'DELETE':
      try {
        await r2_delete_object({
          bucket: bucketName,
          key: `${session.user.id}/${documentId}`
        });

        return res.status(200).json({ message: 'Document deleted successfully' });
      } catch (error) {
        console.error('Error deleting document:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}