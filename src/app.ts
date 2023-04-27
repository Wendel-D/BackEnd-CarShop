import express from 'express';
import carsRoutes from './Routes/Cars.routes';
import motorsRoutes from './Routes/Motorcycles.routes'

const app = express();
app.use(express.json());
app.use(carsRoutes);
app.use(motorsRoutes);

export default app;
