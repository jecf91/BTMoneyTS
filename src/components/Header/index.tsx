import logo from '../../assets/logo.svg';
import { HeaderContainer, HeaderContent } from './styles';

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img alt="dt money logo" src={logo} />
        <button onClick={onOpenNewTransactionModal} type="button">
          New Transaction
        </button>
      </HeaderContent>
    </HeaderContainer>
  );
}
