// TDD is simular to what I have been doing except you'd write the tests first
import { getMemberTotals, getAttendenceTotals, getSeasonTotals } from '../../functions/recordTotals';
import { members, records, sessions, sessionNames } from '../fixtures/fixures'; 

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
	const totals = getMemberTotals( [sessions[0], sessions[1], sessions[2]], members[3].playerUuid );

	expect(totals.totalPaid).toBe(0);
 	expect(totals.totalDebt).toBe(650);
});

test('should calculate the right amount for several Sessions, WITH 100% discount, for single player', () => 
{
	const totals = getMemberTotals( [sessions[0], sessions[1], sessions[2]], members[2].playerUuid );

	expect(totals.totalPaid).toBe(0);
 	expect(totals.totalDebt).toBe(0);
});

test('should calculate the right amount for several Sessions, WITHOUT discount, for single player', () => 
{
	const totals = getMemberTotals( [sessions[0], sessions[1], sessions[2]], members[1].playerUuid );

	expect(totals.totalPaid).toBe(0);
 	expect(totals.totalDebt).toBe(1300);
});

test('should calculate the right amount for Sessions, Payments and Debts for Single Player', () => 
{
	// Merging all records together
	const memberRecords = [records[1], records[4], records[5]]
	const allRecords = memberRecords.concat([sessions[0], sessions[1], sessions[2]]);
	const totals = getMemberTotals( allRecords, members[1].playerUuid );

	expect(totals.totalPaid).toBe(3900);
 	expect(totals.totalDebt).toBe(4900);
});

test('should return empty array for Empty Total Attendence', () =>
{
	const attendence = getAttendenceTotals([]);
	
	expect(attendence).toEqual([]);
});

test('should return a single tally for "Training"', () =>
{
	const attendence = getAttendenceTotals([sessions[0]]);

	expect(attendence).toEqual(
	[{	
		sessionName: sessions[0].sessionName,
		sessionUuid: expect.any(String), // TODO: Refactor to use Sessions Actual UUID
		count: 1
	}]);
});

test('should return tallys for Sessions', () =>
{
	const attendence = getAttendenceTotals(sessions);

	expect(attendence).toEqual(
	[{	
		sessionName: sessionNames[0].sessionName,
		sessionUuid: expect.any(String), // TODO: Refactor to use Sessions Actual UUID
		count: 2
	},
	{	
		sessionName: sessionNames[1].sessionName,
		sessionUuid: expect.any(String), // TODO: Refactor to use Sessions Actual UUID
		count: 1
	},
	{	
		sessionName: sessionNames[2].sessionName,
		sessionUuid: expect.any(String), // TODO: Refactor to use Sessions Actual UUID
		count: 3
	}]);
});