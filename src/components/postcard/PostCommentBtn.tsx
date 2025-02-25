import { MessageCircle } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction } from "react";

export default function PostCommentBtn({
    focusComment,
	setFocusComment,
}: {
    focusComment: boolean;
	setFocusComment: Dispatch<SetStateAction<boolean>>;
}) {
    function handleClick(event: FormEvent) {
        event.stopPropagation();
        setFocusComment(prev => !prev);
    }
	return (
		<button
            onClick={handleClick}
            className={`border-2 rounded-full px-2 py-1 transition-colors hover:bg-gray-100 flex items-center gap-2 font-semibold ${
                focusComment ? "border-teal-500 text-teal-500" : ""
            }`}
		>
			<MessageCircle size={16} />
			Comment
		</button>
	);
}
