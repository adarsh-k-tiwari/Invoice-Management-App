import axios from 'axios';
import { SERVER_URL,ROLL_NUMBER } from '../utils/constants';


export function serviceCall() {
  return axios.post(`${SERVER_URL}`);
}

export function callDummyAPI(name) {
  return axios.post(
    `http://localhost:8080/1805695/add?`,
    {},
    {
      headers: { 'Content-Type': 'application/json' },
      params: { name_customer: name },
      params: { cust_number: name },
      params: { invoice_id: name },
      params: { total_open_amount: name },
      params: { due_in_date: name },
      params: { notes: name },
    }
  );
}
