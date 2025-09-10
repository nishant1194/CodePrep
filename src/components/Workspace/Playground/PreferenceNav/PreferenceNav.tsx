import { useState, useEffect } from "react";
import {
	AiOutlineFullscreen,
	AiOutlineFullscreenExit,
} from "react-icons/ai";

const languages = ["javascript", "cpp", "python", "java"];

const PreferenceNav = ({ selectedLanguage, setSelectedLanguage }) => {
	const [isFullScreen, setIsFullScreen] = useState(false);

	const handleFullScreen = () => {
		if (isFullScreen) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
		setIsFullScreen(!isFullScreen);
	};

	useEffect(() => {
		const exitHandler = () => {
			setIsFullScreen(!!document.fullscreenElement);
		};

		document.addEventListener("fullscreenchange", exitHandler);
		document.addEventListener("webkitfullscreenchange", exitHandler);
		document.addEventListener("mozfullscreenchange", exitHandler);
		document.addEventListener("MSFullscreenChange", exitHandler);

		return () => {
			document.removeEventListener("fullscreenchange", exitHandler);
			document.removeEventListener("webkitfullscreenchange", exitHandler);
			document.removeEventListener("mozfullscreenchange", exitHandler);
			document.removeEventListener("MSFullscreenChange", exitHandler);
		};
	}, []);

	return (
		<div className='flex items-center justify-between bg-[rgb(26,26,26)] h-11 w-full'>
			{/* Language Dropdown */}
			<div className='flex items-center text-white px-2'>
				<select
					value={selectedLanguage}
					onChange={(e) => setSelectedLanguage(e.target.value)}
					className='bg-[hsla(0,0%,100%,.14)] text-white rounded px-2 py-1.5 text-xs cursor-pointer focus:outline-none'
				>
					{languages.map((lang) => (
						<option key={lang} value={lang}>
							{lang}
						</option>
					))}
				</select>
			</div>

			{/* Fullscreen Button */}
			<div className='flex items-center m-2'>
				<button className='preferenceBtn group' onClick={handleFullScreen}>
					<div className='h-4 w-4 text-white font-bold text-lg'>
						{!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
					</div>
				</button>
			</div>
		</div>
	);
};

export default PreferenceNav;
