const allowedOrigins = [
    "http://localhost:5173",
    "https://our-domain-name.vercel.app", // main prod
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (origin.startsWith("http://localhost:")) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}

export default corsOptions;