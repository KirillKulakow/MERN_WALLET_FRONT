export const BASIC_INFO = "@basicInfo/change";

export const changeBasicInputs = ({ target }) => ({
  type: BASIC_INFO,
  name: target.name,
  value: target.value,
});




const TABLE_DATA_ITEM = {
  date: "25.08.2020",
  type: "+",
  category: "Different",
  commentary: "Bla bla bla",
  sum: 1000.00,
  balance: 1000.00
}