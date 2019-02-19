import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import {
    tag,
    book as story,
    cog as settings,
    listOl as chapters,
    listAlt as notes,
} from 'react-icons-kit/fa';
import {
    ic_create as prompt,
    ic_people as characters,
    ic_insert_drive_file as draft,
} from 'react-icons-kit/md';
import { iosPulseStrong as plots } from 'react-icons-kit/ionicons';

export default class Features extends Component {
    render() {
        return (
            <div className="featureListContainer">
                <div>
                    <div className="featureLabel">
                        <Icon className="icon" icon={story} size={40} />
                        &nbsp; Stories
                    </div>

                    <ul>
                        <li>Create Unlimited Stories</li>
                        <li>Once a story is created you can</li>
                        <li>
                            Add Characters, Chapters, Plot points, Write a draft, or even create
                            some notes
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="featureLabel">
                        <Icon className="icon" icon={tag} size={40} />
                        &nbsp; Tags
                    </div>
                    <ul>
                        <li> Create custom tags </li>
                        <li> Assign them to stories and characters</li>
                    </ul>
                </div>
                <div>
                    <div className="featureLabel">
                        <Icon className="icon" icon={prompt} size={40} />
                        &nbsp; Prompt
                    </div>
                    <ul>
                        <li>
                            Unable to think of a new story idea? Check out the prompts we provide
                        </li>
                        <li> Prompts are user submitted </li>
                        <li> We'll show you a new prompt every hour </li>
                        <li>
                            If you don't like a prompt, down vote it to ensure you'll never see it
                            again
                        </li>
                        <li>
                            If you like a prompt, we provide an automated way of creating a story
                            based on the prompt so you can get to work right away.
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="featureLabel">
                        <Icon className="icon" icon={chapters} size={40} />
                        &nbsp; Chapters
                    </div>
                    <ul>
                        <li> Create Chapters for a story </li>
                        <li>Chapters are ordered by the Chapter Number you assign them</li>
                        <li> Write Content for individual chapters </li>
                        <li>
                            Export your chapters. We'll email you a nicely segmented text document
                            with all your chapters and their content
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="featureLabel">
                        <Icon className="icon" icon={plots} size={40} />
                        &nbsp;Plots:
                    </div>
                    <ul>
                        <li> Create plot points to better layout your story </li>
                        <li> Add Children to plot points for even more depth</li>
                    </ul>
                </div>
                <div>
                    <div className="featureLabel">
                        <Icon className="icon" icon={characters} size={40} />
                        &nbsp;Characters
                    </div>
                    <ul>
                        <li> Add a custom image to a created character </li>
                        <li>
                            Add fields such as Character name, age, story role, goal, description,
                            and attributes
                        </li>
                        <li> Order your character list dynamically</li>
                    </ul>
                </div>
                <div>
                    <div className="featureLabel">
                        <Icon className="icon" icon={draft} size={40} />
                        &nbsp;Draft
                    </div>
                    <ul>
                        <li>
                            If you prefer writing the whole draft of your story instead of
                            individual chapters, you have that option as well.
                        </li>
                        <li>
                            Export your draft. We'll email you a text document containing your
                            draft.
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="featureLabel">
                        <Icon className="icon" icon={notes} size={40} />
                        &nbsp; Notes
                    </div>
                    <ul>
                        <li>
                            Have an idea regarding one of your stories you don't want to forget?
                            Create a note!
                        </li>
                        <li>
                            Comes with an export feature incase you prefer your notes in a text
                            document format
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="featureLabel">
                        <Icon className="icon" icon={settings} size={40} />
                        &nbsp; Settings
                    </div>
                    <ul>
                        <li>
                            Have a bug you found that needs some fixing? Submit a bug report - our
                            turn around for bug fixes is usually within 24 hours!
                        </li>
                        <li>
                            Have a awesome feature idea? I would love to build it. Submit a feature
                            request from within the app. We already have user submitted features
                            live including: prompts, writing chapters' content, and ordering one's
                            character list.
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
