import { SummaryContainer } from './styles';

import Income from '../../assets/income.svg';
import Outcome from '../../assets/outcome.svg';
import Total from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (accumulator, transaction) => {
      if (transaction.type === 'deposit') {
        accumulator.deposit += transaction.value;
        accumulator.total += transaction.value;
      } else {
        accumulator.withdraw += transaction.value;
        accumulator.total -= transaction.value;
      }
      return accumulator;
    },
    { deposit: 0, withdraw: 0, total: 0 }
  );

  return (
    <SummaryContainer>
      <div>
        <header>
          <p>Income</p>
          <img src={Income} alt="income" />
        </header>

        <strong>
          {new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
          }).format(summary.deposit)}
        </strong>
      </div>
      <div>
        <header>
          <p>Outcome</p>
          <img src={Outcome} alt="income" />
        </header>
        <strong>
          -
          {new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
          }).format(summary.withdraw)}
        </strong>
      </div>
      <div className="highlight--green">
        <header>
          {' '}
          <p>Total</p>
          <img src={Total} alt="income" />
        </header>
        <strong>
          {new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
          }).format(summary.total)}
        </strong>
      </div>
    </SummaryContainer>
  );
}
