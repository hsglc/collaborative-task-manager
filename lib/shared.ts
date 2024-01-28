import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatRelativeTime(specifiedDate: Date): string {
	const currentDate = new Date();

	const timeDifference = currentDate.getTime() - specifiedDate.getTime();

	const minutesDifference = Math.floor(timeDifference / (1000 * 60));

	const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
	let formattedTime: string;

	if (minutesDifference < 60) {
		formattedTime = rtf.format(-minutesDifference, "minute");
	} else if (minutesDifference < 60 * 24) {
		const hoursDifference = Math.floor(minutesDifference / 60);
		formattedTime = rtf.format(-hoursDifference, "hour");
	} else {
		const daysDifference = Math.floor(minutesDifference / (60 * 24));
		formattedTime = rtf.format(-daysDifference, "day");
	}

	return formattedTime;
}

export function getCurrentFormattedDate() {
	// return in this format: Friday, February 10, 2023 at 5:57 PM
	const options: Intl.DateTimeFormatOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};

	const currentDate: string = new Date().toLocaleDateString("en-US", options);

	return currentDate;
}
