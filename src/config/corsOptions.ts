const ALLOWED_ORIGINS = [
  "http://localhost:5173",
]

export const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (ALLOWED_ORIGINS.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
}
