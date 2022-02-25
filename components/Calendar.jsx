import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import locale from "dayjs/locale/cs";
import weekdayPlugin from "dayjs/plugin/weekday";
import arrayPlugin from "dayjs/plugin/toObject";

const Calendar = () => {
	const now = dayjs().locale({
		...locale,
	});
	//so that I start from monday (now its locale aware and cs starts with monday)
	dayjs.extend(weekdayPlugin);
	dayjs.extend(arrayPlugin);

	const [currentMonth, setCurrentMonth] = useState(now.get("month"));
	const [selectedData, setSelectedDate] = useState();
	const [arrayOfDays, setArrayOfDays] = useState([]);

	const onDateClick = day => {};

	const nextMonth = () => {
		setCurrentMonth(prev => prev + 1);
	};

	const prevMonth = () => {
		setCurrentMonth(prev => prev - 1);
	};

	const renderHeader = () => {
		const dateFormat = "MMMM YYYY";

		return (
			<div className="header row flex-middle">
				<div className="col col-start">
					<div className="icon" onClick={() => prevMonth()}>
						chevron_left
					</div>
				</div>
				<div className="col col-center">
					<span>{now.month(currentMonth).format(dateFormat)}</span>
				</div>
				<div className="col col-end" onClick={() => nextMonth()}>
					<div className="icon">chevron_right</div>
				</div>
			</div>
		);
	};

	const renderDays = () => {
		const dateFormat = "dddd";
		const days = [];

		for (let i = 0; i < 7; i++) {
			days.push(
				<div className="col col-center" key={i}>
					{now.weekday(i).format(dateFormat)}
				</div>
			);
		}
		return <div className="days row">{days}</div>;
	};

	const renderCells = () => {
		const rows = [];
		let days = [];

		//loop over all days in month
		for (let i = 0; i <= arrayOfDays.length; i++) {
			days.push(
				<div className={`col cell`} key={i}>
					<span className="number">{arrayOfDays[i]?.format("ddd DD")}</span>
					<span className="bg">{arrayOfDays[i]?.format("ddd DD")}</span>
				</div>
			);

			//put 7 items in a row
			// if (i % 7 === 0) {
			rows.push(
				<div className="row" key={i}>
					{days}
				</div>
			);
			days = [];
			// }
		}
		//dopln pred a po okna
		return <div className="body">{rows}</div>;
	};

	const getAllDays = () => {
		let days = [];
		const daysInMonth = now.month(currentMonth).daysInMonth();

		const dateOfMonth = date => {
			const monthStart = now.startOf("month");
			return monthStart.month(currentMonth).date(date);
		};

		const beforeFirstDay = +dateOfMonth(1).format("d");

		console.log(beforeFirstDay, "before");

		//if first day is !== pondeli, pak musim vygenerovat dny z predchoziho mesice
		for (let i = 1; i < beforeFirstDay; i++) {
			let j = i;
			days.push(dateOfMonth(--j));
		}

		//add all dates to the array
		for (let i = 1; i <= daysInMonth; i++) {
			days.push(dateOfMonth(i));
		}

		setArrayOfDays(days);
		days = [];
	};

	useEffect(() => {
		getAllDays();
		console.log("initial fetch");
	}, []);

	useEffect(() => {
		getAllDays();
	}, [currentMonth]);

	return (
		<div className="calendar">
			{renderHeader()}
			{renderDays()}
			{renderCells()}
			<button onClick={() => console.log(arrayOfDays)}>see all days</button>
		</div>
	);
};

export default Calendar;
