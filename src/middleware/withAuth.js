import { verifyToken } from '@/lib/auth';
import useAuthStore from '@/store/auth';

export function withAuth(getServerSidePropsFunc) {
  return async (context) => {
    const { req, res } = context;
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    try {
      const decoded = verifyToken(token);

      if (!decoded) {
        throw new Error('Invalid token');
      }

      // Additional server-side auth store update if needed
      const authStore = useAuthStore.getState();
      authStore.user = decoded;

      // Call the original getServerSideProps if it exists
      if (getServerSidePropsFunc) {
        const additionalProps = await getServerSidePropsFunc(context);
        return {
          props: {
            ...additionalProps.props,
            user: decoded
          }
        };
      }

      return {
        props: {
          user: decoded
        }
      };
    } catch (error) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  };
}