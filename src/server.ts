import app from './app';
import { ENV } from './env/env';

app.listen({
  port: ENV.PORT,
  host: "0.0.0.0",
}).then(() => {
  console.log(`Server is running on port ${ENV.PORT}`);
})
