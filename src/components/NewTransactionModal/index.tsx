import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import CloseIcon from '../../assets/closeX.svg';
import incomeIcon from '../../assets/income.svg';
import outcomeIcon from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';
import {
  ModalContainer,
  TransactionTypeContainer,
  TransactionTypeButton,
} from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState('deposit');
  const [transactionName, setTransactionName] = useState('');
  const [transactionValue, setTransactionValue] = useState(0);
  const [transactionCategory, setTransactionCategory] = useState('');

  async function handleSubmitTransaction(event: FormEvent) {
    event.preventDefault();
    const data = {
      type,
      title: transactionName,
      value: transactionValue,
      category: transactionCategory,
    };
    await createTransaction(data);
    setType('deposit');
    setTransactionName('');
    setTransactionValue(0);
    setTransactionCategory('');
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="reactModal__overlay"
      className="reactModal__content"
    >
      <ModalContainer onSubmit={handleSubmitTransaction}>
        <button
          type="button"
          onClick={onRequestClose}
          className="reactModal__btnClose"
        >
          <img src={CloseIcon} alt="close modal" />
        </button>
        <h2>Register Transaction</h2>
        <input
          type="text"
          value={transactionName}
          onChange={(event) => setTransactionName(event.target.value)}
          placeholder="Transaction name"
        />
        <input
          type="number"
          value={transactionValue}
          onChange={(event) => setTransactionValue(Number(event.target.value))}
          placeholder="Value"
        />
        <TransactionTypeContainer>
          <TransactionTypeButton
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeIcon} alt="deposit" />
            <span>Deposit</span>
          </TransactionTypeButton>
          <TransactionTypeButton
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeIcon} alt="withdraw" />
            <span>Withdraw</span>
          </TransactionTypeButton>
        </TransactionTypeContainer>
        <input
          type="text"
          value={transactionCategory}
          onChange={(event) => setTransactionCategory(event.target.value)}
          placeholder="Category"
        />
        <button type="submit">Register</button>
      </ModalContainer>
    </Modal>
  );
}
