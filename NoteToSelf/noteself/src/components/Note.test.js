import React from 'react'
import { shallow } from 'enzyme'
import { Note }  from './Note'
import { spy, stub } from 'sinon';


const props ={
  noteId:0,  
  noteText:'Testing note component',
  editNoteCard:0
} 

const arrayClass = ['fa fa-plus','fa fa-pencil','fa fa-trash']

describe("Note renders correctly", () => {
    const editNote = new stub();
    const handleChange = new stub();
    const submitAfterEdit = new stub();
    const note = shallow(<Note 
                         noteText={props.noteText}
                         noteId={props.noteId}
                         editNoteCard={props.editNoteCard}
                         editNote={editNote}
                         handleChange={handleChange}
                         submitAfterEdit={submitAfterEdit}
                         />);
   
    it('renders icons correctly', () => {
        // console.log('',note.prop());
        note.find('span i').forEach((element,index) => {
            element.hasClass(arrayClass[index]);
        })
    }) 


    describe('when on edit button is fired from child',() => {
        beforeEach(() => {
            note.find("span").at(1).simulate('click');
          });
        
        it('function edit note has been called',() => {
            expect(editNote.callCount).toEqual(1);
          })

        it('renders the input tag inside', () => {
            expect(note.find("input").at(0).exists()).toBe(true);
         })

         describe('when handle change is called ', () => {
             beforeEach(() => {
                note.find("input").at(0).simulate('change',{target:{value:'new Testing node'}})
             })

             it('should call the handlechange func', () => {
                expect(handleChange.callCount).toEqual(1);
             })

             describe('when submit button is clicked', () => {
                 beforeEach(() => {
                    note.find("span").at(0).simulate('click',props.id);
                 })

                 it('update of notes takes place', () => {
                    expect(submitAfterEdit.callCount).toEqual(1);
                 })

                 it('notes state array will be updated ',() => {
                    expect(note.find("h4").text()).toEqual('');
                 })
             })
            
         })

    })
    
   
})
