const config = {
  serviceUser: JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_USER || '{}', 'base64').toString('utf8')),
};

export default config;
