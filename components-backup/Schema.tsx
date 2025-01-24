import Head from 'next/head';

interface SchemaProps {
  data: Record<string, any>;
}

export default function Schema({ data }: SchemaProps) {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  );
}
