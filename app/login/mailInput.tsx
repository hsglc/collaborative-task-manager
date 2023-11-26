import { Input } from '@nextui-org/react';
import { MailIcon } from '@/icons/MailIcon';

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
