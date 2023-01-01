import axios from "axios"
import { confirmarPago } from "../reducer/pagoReducer"


export const confirmacionPagosAsync = (data) => async (dispatch) => {
  try {
    const respuesta = await axios
       .post('/pago ', data, {
         // Endpoint to send files
         headers: {
           // Add any auth token here
           'content-type': 'multipart/form-data',
         },
       })
       console.log(respuesta.data)
      // dispatch(confirmarPago(response.data.data))
      const confirmacion=respuesta.data;
       return confirmacion;
  } catch (error) {
    console.log(error)
  }
}
export const acountCreator = (id) => async (dispatch) => {
  try {
    const respuesta = await axios.post(`/stripe/account/${id}`)
       //console.log(respuesta.data)
      // dispatch(confirmarPago(response.data.data))
      const confirmacion=respuesta.data;
       return confirmacion;
  } catch (error) {
    console.log(error)
  }
}

export const srtipeAccountLink = (id) => async (dispatch) => {
  try {
    const respuesta = await axios.post(`/stripe/accountLink/${id}`)
       //console.log(respuesta.data)
      // dispatch(confirmarPago(response.data.data))
      const confirmacion=respuesta.data;
       return confirmacion;
  } catch (error) {
    console.log(error)
  }
}
////////consulta stripe cuenta
export const stripeAccountsConsult = (id) => async (dispatch) => {
  try {
    const respuesta = await axios.get(`/stripe/account/${id}`)
       //console.log(respuesta.data)
      // dispatch(confirmarPago(response.data.data))
      const confirmacion=respuesta.data;
       return confirmacion;
  } catch (error) {
    console.log(error)
  }
}
/////donaciones
export const chekout = (data) => async (dispatch) => {
  try {
    const respuesta = await axios
       .post('/stripe/chekout/ ', data, {
         // Endpoint to send files
         headers: {
           // Add any auth token here
           'content-type': 'multipart/form-data',
         },
       })
       //console.log(respuesta.data)
      // dispatch(confirmarPago(response.data.data))
      const confirmacion=respuesta.data;
       return confirmacion;
  } catch (error) {
    console.log(error)
  }
}


///lista de precios

export const getPrices = () => async (dispatch) => {
  try {
    const respuesta = await axios.get(`/stripe/prices/`)
       //console.log(respuesta.data)
      // dispatch(confirmarPago(response.data.data))
      const confirmacion=respuesta.data;
       return confirmacion;
  } catch (error) {
    console.log(error)
  }
}