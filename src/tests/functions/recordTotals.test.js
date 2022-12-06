// TDD is simular to what I have been doing except you'd write the tests first
import { getMemberTotals, getAttendenceTotals, getSeasonTotals } from '../../functions/recordTotals';
import { records, sessions, members } from '../fixtures/fixures'; 

test('Should get zero for both amount paid and debts', () => 
{ 
	const totals = getMemberTotals( [] );
	expect(totals.totalPaid).toBe(0);
	expect(totals.totalDebt).toBe(0);
});

test('Should get the right amounts for One Payment', () => 
{ 
	const totals = getMemberTotals( [records[1]] );

	expect(totals.totalPaid).toBe(400);
	expect(totals.totalDebt).toBe(0);
});

test('Should get the right amounts for one debt', () => 
{ 
	const totals = getMemberTotals( [records[0]] );
	expect(totals.totalPaid).toBe(0);
	expect(totals.totalDebt).toBe(400);
});

test('Should get the right amounts when Amounts Paid is more than Debts', () => 
{ 
	const totals = getMemberTotals( records );
	expect(totals.totalPaid).toBe(9400);
	expect(totals.totalDebt).toBe(0);
});

test('Should get the right amounts when Debt is more than Amounts Paid', () => 
{ 
	const currentRecords = [ records[0], records[2], records[4] ]
	const totals = getMemberTotals( currentRecords );
	expect(totals.totalPaid).toBe(500);
	expect(totals.totalDebt).toBe(7400);
});

test('should calculate the right amount, WITHOUT discount, for a Single Session for a member', () => 
{
	const totals = getMemberTotals( [sessions[0]], members[0].playerUuid );

	expect(totals.totalPaid).toBe(0);
 	expect(totals.totalDebt).toBe(400);
});

test('should calculate the right amount, WITH discount, for a Single Session for a member', () => 
{
	const totals = getMemberTotals( [sessions[0]], members[3].playerUuid );

	expect(totals.totalPaid).toBe(0);
 	expect(totals.totalDebt).toBe(200);
});

test('should calculate the right amount for several Sessions, WITH discount, for single player', () => 
{
	const totals = getMemberTotals( sessions, members[3].playerUuid );

	expect(totals.totalPaid).toBe(0);
 	expect(totals.totalDebt).toBe(650);
});

test('should calculate the right amount for several Sessions, WITH 100% discount, for single player', () => 
{
	const totals = getMemberTotals( sessions, members[2].playerUuid );

	expect(totals.totalPaid).toBe(0);
 	expect(totals.totalDebt).toBe(0);
});

test('should calculate the right amount for several Sessions, WITHOUT discount, for single player', () => 
{
	const totals = getMemberTotals( sessions, members[1].playerUuid );

	expect(totals.totalPaid).toBe(0);
 	expect(totals.totalDebt).toBe(1300);
});

