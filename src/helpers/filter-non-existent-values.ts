export const newList = (listBody:any, listRequest:any) => {

  return listBody.filter((auxData:any) => {
    return !listRequest.some((productData:any) => productData?.codigo == auxData.cod);
  }).map((_) => _);

}