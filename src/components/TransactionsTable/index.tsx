import { TableContainer } from './styles';
import { useTransactions } from '../../hooks/useTransactions';
export function TransactionsTable() {
  const { transactions } = useTransactions();

  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            <th>Transaction name</th>
            <th>Value</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 &&
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {new Intl.NumberFormat('de-DE', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(transaction.value)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat('de-DE').format(
                    new Date(transaction.createdAt)
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </TableContainer>
  );
}
