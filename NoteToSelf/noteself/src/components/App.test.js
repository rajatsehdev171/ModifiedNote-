import React from 'react'
import App from './App'
import { mount, shallow } from 'enzyme'

describe('App Component..', () => {
    let appWrapper = mount(<App/>);

    it('renders the app title..',() => {
        expect(appWrapper.find('h4').text()).toEqual('Take A Note')
    })

    it("renders FormGroup Component..", () => {
        expect(appWrapper.find('FormGroup').exists()).toBe(true);
    })

    it('renders the FormControl Component..', () => {
        expect(appWrapper.find('FormControl').exists()).toBe(true);
    })

    it('renders the Submit Button with text `Submit`..', () => {
        expect(appWrapper.find('Button').at(0).text()).toEqual('Submit');
    })

    describe('when creating a note ', () => {
        let testNote = 'Hi guys';
        beforeEach(() => {
            appWrapper.find('FormControl').simulate('change',{target:{value:testNote}})
        })

        afterEach(() => {
            appWrapper.find('Button').last().simulate('click');
        })

        it('state value of text in app should change',() => {
            expect(appWrapper.state().text).toEqual(testNote)
        })

        describe('when we click submit button', () => {
            beforeEach(() => {
                appWrapper.find('Button').at(0).simulate('click')
            })

            it('notes state should update', () => {
                expect(appWrapper.state().notes[0].text).toEqual(testNote)
            })

            it('checking Note Component render count', () => {
                expect(appWrapper.find('Note').length).toEqual(1);
            })

            describe('checking note component behaviour', () => {
                it('renders the text in h4',() => {
                    expect(appWrapper.find('Note h4').text()).toEqual(testNote);
                })
                
                describe('when editnote function is called',() => {
                    let noteId = 0;
                    beforeEach(()=> {
                        appWrapper.find('Note').prop('editNote')(noteId);
                    })

                    it('check',() => {
                        expect(appWrapper.state().editNoteCard).toEqual(noteId)
                    })

                    describe('when onchange props inside note is called ',() => {
                        let newNoteInside = 'new note written'
                        beforeEach(() => {
                            appWrapper.find('Note').prop('handleChange')({target:{value:newNoteInside}})
                        })

                        it('should update `text` field in state', () => {
                            expect(appWrapper.state().text).toEqual(newNoteInside)
                        })

                        describe('when submit after editing note is clicked', () => {
                            beforeEach(() => {
                               appWrapper.find('Note').prop('submitAfterEdit')(noteId)
                            })

                            it('should update `notes` state and `editNoteCard` to false', () => {
                                expect((appWrapper.state().notes)).toEqual([{id:0,text:newNoteInside}]);
                            })

                            it('should update `editnotecard` to false', () => {
                                expect((appWrapper.state().editNoteCard)).toEqual(false);
                            })

                            describe('when delete of this note is clicked', () => {
                                beforeEach(() => {
                                    appWrapper.find('Note').prop('deleteNote')(newNoteInside)
                                })

                                it('notes state should update', () => {
                                    expect(appWrapper.state().notes.length).toEqual(0)
                                })
                               
                            })
                        })
                    })
                })
                

               
            })

            describe('when remount of app occurs', () => {
                let app2;
                beforeEach(() => {
                       app2 = mount(<App/>);
                })

                it('checking state of notes on remount', () => {
                    expect(app2.state().notes[0].text).toEqual(testNote)
                })
                
            })
            describe('When Clear Button is clicked', () => {
                beforeEach(() => {
                    appWrapper.find('Button').last().simulate('click');
                })
                
                it('clear the notes state of the app', () => {
                    expect(appWrapper.state().notes).toEqual([])
                })
            })
        })


      
    })


})
