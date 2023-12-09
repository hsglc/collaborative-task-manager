import { MailIcon } from '@/icons/MailIcon';
import { Input } from '@nextui-org/react';

const MailInput = () => {
	return (
		<Input
			type='email'
			label='Email'
			name='email'
			required
			placeholder='you@example.com'
			labelPlacement='outside'
			startContent={
				<MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
			}
		/>
	);
};

export default MailInput;
