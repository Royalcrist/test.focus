import { useState } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Radio,
	RadioGroup,
	Stack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { OptimizeFormData } from '@/types';

interface Props {
	onSubmit: (formData: OptimizeFormData) => void;
}

const OptimizeForm: React.FC<Props> = ({ onSubmit }) => {
	const [formData, setFormData] = useState<OptimizeFormData>({
		m: 40,
		f: 'lambda x: x**2',
		lists: [
			[5, 4],
			[7, 8, 9],
			[5, 7, 8, 9, 10],
		],
		algorithm: 'naive',
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(formData);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData(prevState => ({
			...prevState,
			[name]: name === 'lists' ? JSON.parse(value) : Number(value),
		}));
	};

	const handleRadioChange = (nextValue: string) => {
		setFormData(prevState => ({
			...prevState,
			algorithm: nextValue as 'naive' | 'efficient',
		}));
	};

	return (
		<motion.form
			onSubmit={handleSubmit}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			<Stack spacing={4}>
				<FormControl>
					<FormLabel>Algorithm</FormLabel>
					<RadioGroup value={formData.algorithm} onChange={handleRadioChange}>
						<Stack spacing={5} direction="row">
							<Radio value='naive'>Naive</Radio>
							<Radio value='efficient'>Efficient</Radio>
						</Stack>
					</RadioGroup>
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="m">Modulo divisor (m)</FormLabel>
					<Input
						id="m"
						name="m"
						type="number"
						value={formData.m}
						onChange={handleInputChange}
						min={1}
						max={1000000000}
						required
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="f">Function</FormLabel>
					<Input
						id="f"
						name="f"
						value={formData.f}
						onChange={handleInputChange}
						required
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="lists">Lists (in JSON format)</FormLabel>
					<Input
						id="lists"
						name="lists"
						value={JSON.stringify(formData.lists)}
						onChange={handleInputChange}
						required
					/>
				</FormControl>
				<Box textAlign="center">
					<Button type="submit" colorScheme="blue">
						Submit
					</Button>
				</Box>
			</Stack>
		</motion.form>
	);
};

export default OptimizeForm;
