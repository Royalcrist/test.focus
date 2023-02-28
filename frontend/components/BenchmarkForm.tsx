import { useState } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { BenchmarkRequest } from '@/types';

interface Props {
	onSubmit: (formData: BenchmarkRequest) => void;
}

const BenchmarkForm: React.FC<Props> = ({ onSubmit }) => {
	const [formData, setFormData] = useState<BenchmarkRequest>({
		numLists: 4,
		numElements: 3,
		replications: 2,
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

	return (
		<motion.form
			onSubmit={handleSubmit}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			<Stack spacing={4}>
				<FormControl>
					<FormLabel htmlFor="num_lists">Number of lists</FormLabel>
					<Input
						id="num_lists"
						name="num_lists"
						type="number"
						value={formData.numLists}
						onChange={handleInputChange}
						min={1}
						max={100}
						required
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="num_elements">Number of elements</FormLabel>
					<Input
						id="num_elements"
						name="num_elements"
						type="number"
						value={formData.numElements}
						onChange={handleInputChange}
						min={1}
						max={1000000000}
						required
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="replications">Replications</FormLabel>
					<Input
						id="replications"
						name="replications"
						type="number"
						value={formData.replications}
						min={1}
						max={1000000}
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

export default BenchmarkForm;
