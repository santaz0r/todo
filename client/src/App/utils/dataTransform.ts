import { TFullDataUser } from '../types/User.type';

const transformData = (data: TFullDataUser[]) => {
  if (data) {
    return data.map((item) => ({ label: `${item.name} ${item.lastName}`, value: item._id }));
  }
  return [];
};

export default transformData;
