// TDD is simular to what I have been doing except you'd write the tests first
import recordTotals from '../../selectors/record-totals';
import { records, members, seasons, } from '../fixtures/fixures'; 

test('Should get zero for both amount paid and debts', () => 
{ 
	const totals = recordTotals( [] );
	expect(totals.totalIncome).toBe(0);
	expect(totals.totalDebt).toBe(0);
});

test('Should get the right amounts for one amount paid', () => 
{ 
	const totals = recordTotals( [records[1]] );
	expect(totals.totalIncome).toBe(400);
	expect(totals.totalDebt).toBe(0);
});

test('Should get the right amounts for one debt', () => 
{ 
	const totals = recordTotals( [records[0]] );
	expect(totals.totalIncome).toBe(0);
	expect(totals.totalDebt).toBe(400);
});

test('Should get the right amounts for both amount paid and debts', () => 
{ 
	const totals = recordTotals( records );
	expect(totals.totalIncome).toBe(9400);
	expect(totals.totalDebt).toBe(4400);
});

test('Should make sure Dept Payments are being subtracked from Debt total', () =>
{

});