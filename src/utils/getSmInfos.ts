import { TransportAPI } from "@/apis/transportOrder";
import { ValidationListRequest } from "@/models/ApiTypes";
import { SmInfos } from "@/types/excel";
import { Error } from "./toAxios";

const getSmInfos = async (excelData: string[][]): Promise<[Error, null] | [null, SmInfos]> => {
  const smNamesSet = new Set();

  excelData.forEach((row) => {
    row.forEach((value) => {
      smNamesSet.add(String(value));
    });
  });

  const smNames = Array.from(smNamesSet) as string[];

  const validationListRequest: ValidationListRequest = {
    requests: smNames.map((smName) => ({ smName })),
  };

  const [error, data] = await TransportAPI.valid(validationListRequest);

  if (error) {
    return [error, data];
  } else {
    const smInfos = {} as SmInfos;

    data.forEach(({ smId, smNameValid }, index) => {
      smInfos[smNames[index]] = {
        smId,
        smNameValid,
      };
    });

    return [error, smInfos];
  }
};

export default getSmInfos;
