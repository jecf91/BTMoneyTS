import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { GlobalStyle } from './styles/global';
import { useState } from 'react';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionProvider } from './hooks/useTransactions';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTranscationModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTranscationModalOpen(true);
  }
  function handleCloseNewTransactionModal() {
    setIsNewTranscationModalOpen(false);
  }

  return (
    <TransactionProvider>
      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionProvider>
  );
}
