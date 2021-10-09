import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  value: number;
  type: string;
  category: string;
  createdAt: string;
}

//type TransactionPostData = Pick<Transaction, "title"|"value"| "type"|"category">
type TransactionPostData = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionContextInitialValues {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionPostData) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextInitialValues>(
  {} as TransactionContextInitialValues
);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    api
      .get('transactions')
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionPostData) {
    const response = await api.post('transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;
    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  return context;
}
