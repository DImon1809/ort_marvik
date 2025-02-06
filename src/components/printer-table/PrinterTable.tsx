import "./PrinterTable.scss";

import { FC } from "react";

const printerTableData = [
  { field: "Метод печати", value: "FDM/гибридый" },
  {
    field: "Корпус принтера",
    value: "Открытый/Закрытый (съемный рабочий кабинет)",
  },
  {
    field: "Материал печати",
    value: "Пластиковая нить (FDM), гранулы или затвердевающий полимер",
  },
  { field: "Тип экструдера", value: "Direct (FDM)" },
  { field: "Область построения xyz(мм.)", value: "1040 x 900 x 110" },
  { field: "Количество печатающих головок", value: "2 шт." },
  { field: "Температура экструдера (°C)", value: "270/350 (опционально 450)" },
  { field: "Температура зон стола (°C)", value: "120 (опционально 160)" },
  {
    field: "Дополнительная опция",
    value: "Встроенная термокамера в рабочий кабинет",
  },
  { field: "Габариты станка мм.", value: "1700 х 1500 х 1700" },
];

const PrinterTable: FC = () => {
  return (
    <table className="printer-table">
      <thead>
        <tr>
          <td>Поле</td>
          <td>Значение</td>
        </tr>
      </thead>
      <tbody>
        {printerTableData.map((row, key) => (
          <tr key={key}>
            <td>{row.field}</td>
            <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PrinterTable;
