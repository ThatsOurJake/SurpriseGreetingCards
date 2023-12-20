import { type Session, handleAuth, handleCallback } from '@auth0/nextjs-auth0';

async function afterCallback(req: Request, session: Session) {
  console.log('Signed in with Auth0!');
  return session;
};

export const GET = handleAuth({
  callback: handleCallback({ afterCallback })
});
