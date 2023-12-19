import { initializeApp, cert, getApps } from "firebase-admin/app";

import config from "@/config";

if (getApps().length === 0) {
  initializeApp({
    credential: cert(config.serviceUser),
  });
}
