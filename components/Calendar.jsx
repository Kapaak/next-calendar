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

		arrayOfDays.forEach((week, index) => {
			week.dates.forEach((d, i) => {
				days.push(
					<div className={`col cell`} key={i}>
						<span className="number">{d.day}</span>
						<span className="bg">{d.day}</span>
					</div>
				);
			});
			rows.push(
				<div className="row" key={index}>
					{days}
				</div>
			);
			days = [];
		});

		return <div className="body">{rows}</div>;
	};

	const formateDateObject = dateObject => {
		const clonedObject = { ...dateObject };

		const formatedObject = {
			day: clonedObject.date,
			month: clonedObject.months,
			year: clonedObject.years,
			thisMonth: clonedObject.months === currentMonth,
		};

		return formatedObject;
	};

	const getAllDays = () => {
		let currentDate = now.startOf("month").month(currentMonth).weekday(0);
		let lastDate = now.endOf("month").month(currentMonth).day(7);
		let allDates = [];
		let weekDates = [];

		let j = 0;
		let weekCounter = 1;

		const pushWeekDates = () => {
			allDates.push({ dates: weekDates });
			weekDates = [];
			weekCounter = 0;
		};

		console.log(
			now.endOf("month").month(currentMonth).day(7).toObject(),
			"last"
		);

		while (currentDate <= lastDate) {
			const formated = formateDateObject(currentDate.toObject());

			weekDates.push(formated);

			if (weekCounter === 7) {
				pushWeekDates();
			}

			j++;
			weekCounter++;
			currentDate = now.startOf("month").month(currentMonth).weekday(j);
		}

		setArrayOfDays(allDates);
	};

	useEffect(() => {
		getAllDays();
	}, [currentMonth]);

	//TODO
	//2. musim nejak globalne pridavat data do toho calendare
	//FINISHED. musim ukladat do toho arrayOfDays jestli to je predchozi mesic

	return (
		<div className="calendar">
			{renderHeader()}
			{renderDays()}
			{renderCells()}
		</div>
	);
};

export default Calendar;
