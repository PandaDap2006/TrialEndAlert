import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { TrialPlan } from "./TrialPlanEnding";
import Button from "@mui/material/Button";
import { margin } from "@mui/system";

function App() {
	const [open, setOpen] = useState(true);
	return (
		<div className="App">
			<TrialPlan
				endDate={endDate}
				open={open}
				onClose={() => setOpen(false)}
			/>
			<Button
				sx={{ display: "block", marginLeft: "auto" }}
				variant="contained"
				onClick={() => setOpen(true)}
			>
				Time left on Trial plan{" "}
			</Button>
		</div>
	);
}

const endDate = new Date("2023-11-24T14:00:00");

export default App;
