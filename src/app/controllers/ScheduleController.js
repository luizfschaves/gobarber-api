import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
	async index(req, res) {
		const isProvider = await User.findOne({
			where: { id: req.userId, provider: true },
		});

		if (!isProvider) return res.status(401).json({ error: 'User is not provider.' });

		const { date = new Date() } = req.query;

		const parseDate = parseISO(date);

		const schedules = await Appointment.findAll({
			where: {
				provider_id: req.userId,
				canceled_at: null,
				date: { [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)] },
			},
			order: ['date'],
			attributes: ['id', 'date'],
		});

		return res.json(schedules);
	}
}

export default new ScheduleController();
