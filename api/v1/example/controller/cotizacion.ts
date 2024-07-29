import { z } from "zod";
import { validateDataCotizacion } from "../helpers/schemas";
import { CotizacionSegurosPlus, cotizacionVidainsure } from "../../../../helpers/functions";
import { ApiError, ApiResponse } from "../../../../helpers";

export async function cotizacionSeguros(
    values : z.infer<typeof validateDataCotizacion>) {
        try {
            let responseSegurosPlus = await CotizacionSegurosPlus(values.edad, values.sumaAsegurada, values.sexo);
            let responseInsure = cotizacionVidainsure(values.edad, values.sumaAsegurada, values.sexo, values.fumador);
            return new ApiResponse({
                statusCode: 200,
                message: 'Success',
                success: true,
                data: { 
                    primaanualSegurosPlus : responseSegurosPlus.data.primaAnual,
                    primaAnualInsure : responseInsure,
                    sumaAsegurada : values.sumaAsegurada,
                    sexo : values.sexo,
                    edad : values.edad,
                    fumador : values.fumador,
                    moneda : "Dolares" 
                },
                title: "Success"
            });
            
        } catch (error: any) {
            //console.log(error)
            
            throw new ApiError({ statusCode: 500, message: error.message , title: "Error" });
        }
    
}