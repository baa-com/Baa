import { PinInput as ChakraPinInput, Group } from "@chakra-ui/react";
import { forwardRef } from "react";

export const PinInput = forwardRef(function PinInput(props, ref) {
	const { count = 6, inputProps, rootRef, attached, ...rest } = props;
	return (
		<ChakraPinInput.Root ref={rootRef} {...rest}>
			<ChakraPinInput.HiddenInput ref={ref} {...inputProps} />
			<ChakraPinInput.Control>
				<Group attached={attached}>
					{Array.from({ length: count }).map((_, index) => (
						<ChakraPinInput.Input
							key={index}
							index={index}
							borderRadius={props.borderRadius}
							borderColor={props.borderColor}
							boxSize="50px"
							fontSize={props.fontSize}
						/>
					))}
				</Group>
			</ChakraPinInput.Control>
		</ChakraPinInput.Root>
	);
});
