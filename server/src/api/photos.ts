import { Router, Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import { HttpStatusCode } from '../@types';
import { AppDataSource } from '../data-source';
import { asyncMiddleware } from '../middlewares/async';

const router = Router();
const photoRepository = AppDataSource.getRepository(Photo);

const photoSchema = Joi.object({
	label: Joi.string().required(),
	imageUrl: Joi.string().required(),
});

// get all photos
router.get(
	'/',
	asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
		const photos = await photoRepository.find({
			order: {
				createdAt: 'DESC',
			},
		});
		res.status(200).json({ success: true, data: photos });
	})
);

// get photo by  photo id
router.get(
	'/:id',
	asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
		const photo = await photoRepository.findOneBy({ id: req.params.id });
		if (!photo) {
			throw new APIError('NOT FOUND', HttpStatusCode.NOT_FOUND, true, 'Photo not found');
		}
		res.status(200).json({ success: true, data: photo });
	})
);

export default { path: '/photos', router };
