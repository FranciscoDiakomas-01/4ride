import { formatChatDate } from "@/services/dateformater";
import { IMessage } from "@/types/chat";
import IUser from "@/types/user";
import clsx from "clsx";

interface prop {
  message: IMessage;
  user: IUser;
}
export default function Message({ message, user }: prop) {
  return (
    <figure
      className={clsx(
        "flex gap-2 ",

        {
          "place-self-end justify-end": message.type == "my",
        }
      )}
    >
      <img
        src={user.profile}
        className={clsx("h-10 w-10 rounded-full object-contain ", {
          hidden: message.type == "my",
        })}
      />
      <span
        className={clsx(
          "flex flex-col gap-2 p-2 border  rounded-sm",
          {
            "w-[70%]": message.type != "my",
          },
          {
            "w-[90%] bg-green-300/30 border-green-500": message.type == "my",
          }
        )}
      >
        {message.type != "my" && (
          <h1 className="font-semibold text-md">{user.fullname}</h1>
        )}
        <div>{message.message}</div>
        <small className="text-gray-500 text-[12px]">
          {formatChatDate(message.date)}
        </small>
      </span>
    </figure>
  );
}
