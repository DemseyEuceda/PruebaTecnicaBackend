import { Router } from 'express';
import { validateDataCotizacion, validateLoginSchema } from './helpers/schemas';
import { exampleController } from './controller/user';
import { cotizacionSeguros } from './controller/cotizacion';

const router = Router();

const ruta = '/example';


//ruta para el login
router.post(
  ruta+'/login',
  /*Aqui va el middleware */ async function (req, res) {
    const values = await validateLoginSchema.parseAsync(req.body);

    const response = await exampleController(values);

    return res.status(response.statusCode).json(response);
  }
);

//ruta para la cotización

router.post('/cotizacion', async function (req, res) {

  const values = await validateDataCotizacion.parseAsync(req.body);

  const response = await cotizacionSeguros(values);

  return res.json(response);
  
})

export default router;
