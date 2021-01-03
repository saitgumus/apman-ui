import { CommonTypes } from "../Types/Common";
import { Response, Severity } from "../Core/Response";
import { HttpClientServiceInstance } from "./HttpClient";
import { GetActiveLocalUser } from "../Core/Helper";
import { InvoiceContract } from "../Models/Invoice";

export async function SaveExpense(expenseContract) {
  const returnObject = new Response();
  let user = GetActiveLocalUser();

  if (!user || user.userId < 1) {
    returnObject.addResult("Yeniden giriş yapınız.", Severity.Low);
    return returnObject;
  }

  if (!expenseContract) {
    returnObject.addResult("masraf/fatura bilgileri boş olamaz.", Severity.Low);
    return returnObject;
  }
  expenseContract.userId = user.userId;

  await HttpClientServiceInstance.post(
    CommonTypes.GetUrlForAccount("expense", "savenewexpense"),
    expenseContract
  )
    .then((res) => {
      if (res.status === CommonTypes.ResponseStatusCode.successful.created) {
        returnObject.value = 1;
      } else if (res.data) {
        if (!res.data.success) {
          returnObject.addCoreResults(res.data.results);
        }
      }
    })
    .catch((err) => {
      returnObject.addResult(err.message);
    });

  return returnObject;
}

/**
 * masraf listesi getirilir
 * @param {InvoiceContract} invoiceFilterContract
 */
export async function GetExpenceList(invoiceFilterContract) {
  let ro = new Response();
  let filterContract = { ...invoiceFilterContract };
  let url = CommonTypes.GetUrlForAccount("expense", "getexpenselist");
  // eslint-disable-next-line
  let asd = await HttpClientServiceInstance.post(url, filterContract)
    .then((response) => {
      if (!response.data) {
        ro.addResult("Masraf listesi getirilirken hata oluştu.");
      }
      if (response.data.success) {
        ro.value = response.data.value;
      } else {
        ro.addCoreResults(response.data.results);
      }
    })
    .catch((err) => {
      console.log(err);
      ro.addResult(err.message);
    })
    .finally(() => {});
  return ro;
}

/**
 * masraf detayı getirir.
 * @param {number} invoiceId
 */
export async function GetExpenseDetail(invoiceId) {
  let ro = new Response();
  let contract = new InvoiceContract();
  contract.invoiceId = invoiceId;

  let url = CommonTypes.GetUrlForAccount("expense", "getexpensedetail");
  // eslint-disable-next-line
  let asd = await HttpClientServiceInstance.post(url, contract)
    .then((response) => {
      if (!response.data) {
        ro.addResult("Masraf detayı getirilirken hata oluştu.");
      }
      if (response.data.success) {
        ro.value = response.data.value;
      } else {
        ro.addCoreResults(response.data.results);
      }
    })
    .catch((err) => {
      console.log(err);
      ro.addResult(err.message);
    })
    .finally(() => {});
  return ro;
}
