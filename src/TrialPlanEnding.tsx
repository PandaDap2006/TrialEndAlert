import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Button,
	IconButton,
	Snackbar,
	Stack,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
import { color } from "@mui/system";

interface TrialPlanProps {
	endDate: Date;
	open: boolean;
	onClose?: () => void;
}

export function TrialPlan({ endDate, open, onClose }: TrialPlanProps) {
	const [timeLeft, setTimeLeft] = useState(getTimeLeft(endDate));

	let intervalId: number;

	useEffect(() => {
		intervalId = setInterval(() => {
			setTimeLeft(getTimeLeft(endDate));
		}, 1000);
		return () => clearInterval(intervalId);
	});

	return (
		<Snackbar
			anchorOrigin={{ horizontal: "right", vertical: "top" }}
			open={open}
		>
			<Paper
				elevation={5}
				sx={{
					paddingX: 2,
					paddingY: 1,
					backgroundColor: "error.main",
					display: "flex",
				}}
			>
				<Stack direction={"row"} gap={2} alignItems={"center"}>
					<IconButton
						size="small"
						aria-label="close"
						sx={{ color: "white" }}
						onClick={onClose}
					>
						<CloseIcon />
					</IconButton>
					<WarningIcon
						sx={{
							color: "white",
						}}
					/>
					<Typography
						variant="body1"
						fontWeight={600}
						sx={{ color: "white" }}
					>
						Your trial ends in: {format(timeLeft)}
					</Typography>
				</Stack>
			</Paper>
		</Snackbar>
	);
}

function getTimeLeft(endDate: Date) {
	return endDate.getTime() - new Date().getTime();
}

function format(time: number) {
	let seconds: number = Math.floor((time / 1000) % 60),
		minutes: number = Math.floor((time / (1000 * 60)) % 60),
		hours: number = Math.floor((time / (1000 * 60 * 60)) % 24);
	let days: number = time / (1000 * 60 * 60 * 24);

	let format = "";
	if (days > 0) format += days.toFixed(0) + " days ";
	if (hours > 0 || days > 0) format += hours.toFixed(0) + " hours ";
	if (minutes > 0 || hours > 0) format += minutes.toFixed(0) + " minutes ";
	format += seconds.toFixed(0) + " seconds ";
	return format;
}
