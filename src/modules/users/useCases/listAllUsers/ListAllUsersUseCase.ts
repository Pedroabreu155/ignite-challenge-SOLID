import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const requesterUser = this.usersRepository.findById(user_id);
    const users = this.usersRepository.list();

    if (!requesterUser.admin) {
      throw new Error("Only admin users has access!");
    }

    if (!requesterUser) {
      throw new Error("Invalid user id");
    }

    return users;
  }
}

export { ListAllUsersUseCase };
