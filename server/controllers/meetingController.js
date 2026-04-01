import Meeting from '../models/Meeting.js';
import Task from '../models/Task.js';

export const createMeeting = async (req, res) => {
  const { title, description, scheduledAt } = req.body;
  try {
    const meeting = await Meeting.create({
      title,
      description,
      scheduledAt,
      hostId: req.user._id,
      participants: [req.user._id]
    });
    res.status(201).json(meeting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMeetingReport = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id).populate('participants hostId');
    if (meeting) {
      res.json(meeting);
    } else {
      res.status(404).json({ message: 'Meeting not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const endMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);
        if (meeting) {
            meeting.status = 'Completed';
            await meeting.save();
            // In a real app, trigger AI processing here
            res.json({ message: 'Meeting ended and processing started' });
        } else {
            res.status(404).json({ message: 'Meeting not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
