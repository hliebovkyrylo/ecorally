import { CreateCommentUseCase } from './create-comment/create-comment.use-case';
import { GetCommentsByEventIdUseCase } from './get-comments-by-event-id/get-comments-by-event-id.use-case';
import { GetCommentRepliesUseCase } from './get-comment-replies/get-comment-replies.use-case';
import { UpdateCommentUseCase } from './update-comment/update-comment.use-case';
import { DeleteCommentUseCase } from './delete-comment/delete-comment.use-case';

export const USE_CASES = [
  CreateCommentUseCase,
  GetCommentsByEventIdUseCase,
  GetCommentRepliesUseCase,
  UpdateCommentUseCase,
  DeleteCommentUseCase,
];
