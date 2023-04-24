import { useAppSelector } from '../../../../hooks';
import { getUserById } from '../../../store/user';

type TProps = {
  text: string;
  userId: string;
};

function UserInfo({ text, userId }: TProps) {
  const user = useAppSelector(getUserById(userId));
  return (
    <div>
      {text}: {user?.name} {user?.lastName}
    </div>
  );
}

export default UserInfo;
