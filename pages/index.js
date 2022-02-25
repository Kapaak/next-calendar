import Calendar from "../components/Calendar";

export default function Home() {
	return (
		<div>
			<header>
				<div id="logo">
					<span className="icon">date_range</span>
					<span>
						react<b>calendar</b>
					</span>
				</div>
			</header>
			<main>
				<Calendar />
			</main>
		</div>
	);
}
