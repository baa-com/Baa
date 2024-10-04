import { PinInput as ChakraPinInput, Group } from "@chakra-ui/react";
import { forwardRef } from "react";

export const PinInput = forwardRef(function PinInput(props, ref) {
	const { count = 6, inputProps, rootRef, attached, ...rest } = props;
	return (
		<ChakraPinInput.Root ref={rootRef} {...rest} w="full">
			<ChakraPinInput.HiddenInput ref={ref} {...inputProps} />
			<ChakraPinInput.Control>
				<Group attached={attached} w="full" justify="space-between">
					{Array.from({ length: count }).map((_, index) => (
						<ChakraPinInput.Input
							key={index}
							index={index}
							borderWidth="2px"
							borderRadius={props.borderRadius}
							borderColor={props.borderColor}
							boxSize="50px"
							fontSize={props.fontSize}
							_dark={{ borderColor: props._dark?.borderColor }}
						/>
					))}
				</Group>
			</ChakraPinInput.Control>
		</ChakraPinInput.Root>
	);
});
