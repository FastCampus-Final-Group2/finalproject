import { TransportAPI } from "@/apis/transportOrder";
import { ValidationListRequest } from "@/models/ApiTypes";
import { SmInfos } from "@/types/excel";
import { Error } from "./toAxios";

const getSmInfos = async (excelData: string[][]): Promise<[Error, null] | [null, SmInfos]> => {
  const smNamesSet = new Set();

  excelData.forEach((row) => {
    smNamesSet.add(String(row[1]));
  });

  const smNames = Array.from(smNamesSet) as string[];

  const validationListRequest: ValidationListRequest = {
    requests: smNames.map((smName) => ({ smName })),
  };

  const [error, data] = await TransportAPI.valid(validationListRequest);

  if (error) {
    return [error, null];
  } else {
    const smInfos = {} as SmInfos;

    data.validList.forEach(({ smId, smNameValid }, index) => {
      smInfos[smNames[index]] = {
        smId,
        smNameValid,
      };
    });

    return [null, smInfos];
  }
};

export default getSmInfos;
